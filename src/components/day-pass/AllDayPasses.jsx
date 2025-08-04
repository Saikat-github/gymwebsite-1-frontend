import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ArrowLeft, Loader2 } from "lucide-react";
import { getDocuments } from '../../services/firebase/db';
import { toast } from 'react-toastify';
import SingleDayPass from './SingleDayPass';
import { Link } from 'react-router-dom';



const AllDayPasses = () => {
  const [documents, setDocuments] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [loader, setLoader] = useState(true)
  const { user } = useContext(AuthContext);


  useEffect(() => {
    const getDayPassHistory = async () => {
      try {
        setLoader(true)
        const result = await getDocuments(
          'dayPasses',
          user.uid,
          null,
          10
        );
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

    getDayPassHistory()
  }, [])


  // Load more documents
  const loadMore = async () => {
    if (!hasMore || loader) return;

    try {
      setLoader(true);
      const result = await getDocuments(
        'dayPasses',
        user.uid,
        lastDoc,
        10
      );
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
    <div className="text-slate-100">
      <h1 className='text-center text-2xl mb-2'>Day-Pass Details</h1>
      <div className='text-center'>
        <Link to={"/day-pass"} className='px-3 py-1 border border-orange-600 text-center'>
          Back
        </Link>
      </div>

      <div>
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
          {
            documents?.length === 0 ? (
              <div className="text-center text-gray-500">
                No Day-Pass history found.
              </div>
            )
              :
              documents?.map((dayPass, index) => (
                <SingleDayPass key={index} dayPass={dayPass} />
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

export default AllDayPasses