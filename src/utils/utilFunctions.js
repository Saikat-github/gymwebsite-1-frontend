import conf from "../conf/conf";

export const handleUpload = async (file) => {
    try {
        if (!file) throw new Error("No file selected");
        if (!validateFileSize(file, 1)) throw new Error("File size must be under 1MB");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "gym_1_upload_preset_1");
        formData.append("cloud_name", conf.cloudinaryCloudName);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${conf.cloudinaryCloudName}/image/upload`, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        return {
            secure_url: data.secure_url,
            public_id: data.public_id
        };
    } catch (err) {
        throw new Error(err.message || "An error occurred while uploading the file");
    }
};




export const validateFileSize = (file, maxSizeMB) => {
    return file && file.size <= maxSizeMB * 1024 * 1024;
};



// utils/calculateEndDate.js
export const calculateEndDate = (planId) => {
    const days = planId === 'monthly' ? 30 : (planId === 'quaterly') ? 90 : (planId === 'half-yearly' ? 180 : 365);
    const now = new Date();
    now.setDate(now.getDate() + days);
    return now.toLocaleString("en-GB"); // YYYY-MM-DD
};



export const getISTTime = ({ seconds, nanoseconds }) => {
    const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1_000_000);
    const date = new Date(milliseconds);

    // Convert to IST by using toLocaleString with 'Asia/Kolkata'
    return date.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};
