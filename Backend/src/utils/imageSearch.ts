
import { google } from "googleapis";
import { config } from "../config";
const customsearch = google.customsearch({
    version: "v1"
  });
export async function imageSearch(query: string) {
    const imageUrls: string[] = [];
    const res = await customsearch.cse.list({
      cx: config.CUSTOM_SEARCH_CX,
      q: query,
      auth: config.CUSTOM_SEARCH_API_KEY,
      searchType:"image",
      safe: "active"
    });
    // console.log(res.data.items.map(a=>console.log(a)));
    res.data.items.forEach(a=>{
      if(imageUrls.length>=3){
        return
      }
      if(a.mime == "image/jpeg" || a.mime == "image/png" || a.mime == "image/webp"){
        imageUrls.push(a.link);
      }
    })
    return imageUrls;
  }