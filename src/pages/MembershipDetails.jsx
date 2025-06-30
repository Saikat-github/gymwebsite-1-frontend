import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, Navigate } from 'react-router-dom'
import { MembershipHistoryCard } from '../components';
import { User, CalendarClock, Info, Loader2, Clock } from "lucide-react";
import { getDocuments } from '../services/firebase/db';
import { toast } from 'react-toastify';
import { getISTTime } from '../utils/utilFunctions';



const MembershipDetails = () => {
  const [documents, setDocuments] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [loader, setLoader] = useState(true)
  const { memberData } = useContext(AuthContext);

  if (!memberData) {
    return <Navigate to="/" />
  }

  useEffect(() => {
    const getMembershipHistory = async () => {
      try {
        setLoader(true)
        const result = await getDocuments('memberships', memberData?.id);
        if (result.success) {
          setDocuments(result.data);
          setLastDoc(result.lastDoc);
          setHasMore(result.hasMore);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setLoader(false);
      }
    }

    getMembershipHistory()
  }, [])


  // Load more documents
  const loadMore = async () => {
    if (!hasMore || loader) return;

    try {
      setLoader(true);
      const result = await getDocuments('memberships', memberData?.id, lastDoc);
      if (result.success) {
        setDocuments(prev => [...prev, ...result.data]);
        setLastDoc(result.lastDoc);
        setHasMore(result.hasMore);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error loading more documents:", error);
    } finally {
      setLoader(false);
    }
  };


  return (
    <div className="">
      <h1 className='text-center text-2xl mb-2'>Membership Details</h1>
      {memberData?.membershipStatus === "inactive" ? (
        <div className="text-xs p-2 rounded max-w-2xl text-center mx-2 sm:mx-auto flex gap-2 border text-orange-600">
          <Info />
          <div>
            You don't have any active membership, {memberData.endDate ? `your membership expired on ${getISTTime(memberData?.endDate)}` : "please buy a membership plan to continue using our gym services."}{" "}
            <Link to="/plans" className="underline">
              Click Here
            </Link>
          </div>
        </div>
      )
        :
        <div className='flex flex-col gap-1 items-center my-4 text-sm'>
          <p className='flex gap-1 items-center'><User className='w-5 text-green-600' />Membership : Active</p>
          <p className='flex gap-1 items-center'><Clock className='w-5 text-green-600' />Last Payment On : {getISTTime(memberData?.lastPaymentDate)}</p>
          <p className='flex gap-1 items-center'><CalendarClock className='w-5 text-green-600' />Expires on : {getISTTime(memberData?.endDate)}</p>
        </div>
      }

      <hr className='my-4' />
      <div>
        <h1 className='text-center text-2xl'>History</h1>
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
          {
            documents?.length === 0 ? (
              <div className="text-center text-gray-500">
                No membership history found.
              </div>
            )
              :
              documents?.map((membership, index) => (
                <MembershipHistoryCard key={index} membership={membership} name={memberData?.firstName + " " + memberData?.lastName} />
              ))
          }
        </div>
        {
          loader && <Loader2 className='w-8 animate-spin my-10 mx-auto' />
        }
        <button className={`border border-orange-600 cursor-pointer text-white px-4 py-2 rounded-md flex items-center gap-2 mx-auto my-4 ${!hasMore && "hidden"}`} onClick={loadMore} disabled={loader}>
          Load More...
        </button>
      </div>
    </div>

  )
}

export default MembershipDetails