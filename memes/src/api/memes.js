const API_URL = "https://api.imgflip.com/get_memes";

export const getMemes = async () => {
    try{
        const response = await fetch(API_URL);
        if(!response.ok){
            throw new Error("Failed to fetch memes");
        }
        const data = await response.json();
        if(!data.success){
            throw new Error("Imgflip API returned an error");
        }
        return data.data.memes;
    }
    catch(error){
        console.error("Error fetching memes:", error);
        throw error;
    }
};