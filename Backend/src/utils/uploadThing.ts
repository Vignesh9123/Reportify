import { utapi } from "../config/uploadThing"

const DOCX_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export const uploadBuffer = async (buffer: Buffer, filename : string) => {
  try {
    const blob = new Blob([buffer], { type: DOCX_MIME_TYPE });
    const response = await utapi.uploadFiles([
      new File([blob], filename, { type: DOCX_MIME_TYPE })
    ]);
    const key = response[0]?.data?.key;
    if (!key) throw new Error('Upload failed - no URL returned');
    return key;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
}


export const deleteFiles = async(keys: string[])=>{
  if(keys.length === 0) return true;
  const res = await utapi.deleteFiles(keys);
  if(!res.success) throw new Error('Failed to delete files');
  return res.success;
}