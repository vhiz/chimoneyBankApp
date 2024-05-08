import { useState } from "react";
import toast from "react-hot-toast";
import useUserStore from "../store/useUserStore";
import { LuImagePlus, LuUpload } from "react-icons/lu";
import upload from "../lib/upload";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function AddImage() {
  const { userInfo } = useUserStore();
  const [loading, setLoading] = useState(false);

  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  function handleImgChange(e) {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      toast.error("You have to chose an image");
    }
  }
  async function handleUpdate() {
    setLoading(true);
    try {
      const userRef = collection(db, "users");

      if (!img.file) {
        toast.error("Add an image");
        return;
      }

      const imgUrl = await upload(img.file);
      await updateDoc(doc(userRef, userInfo.id), {
        img: imgUrl,
      });
      setImg({ file: null, url: "" });
        document.getElementById("addImage").close();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="modal-box flex flex-col items-center gap-3">
      <h2>Upload Profile Picture</h2>

      <label
        htmlFor="file"
        className="cursor-pointer self-start flex gap-x-5 items-center"
      >
        <img
          src={img.url ? img.url : userInfo.img}
          alt=""
          className="w-14 h-14 rounded-md bg-red-100 object-cover"
        />
        <input
          type="file"
          name=""
          id="file"
          accept="image/*"
          multiple={false}
          className="hidden"
          onChange={handleImgChange}
        />
        <div className="tooltip" data-tip="Choose an image">
          <LuImagePlus className="text-2xl" />
        </div>
      </label>
      <button
        className="btn btn-neutral w-full btn-outline"
        onClick={handleUpdate}
        disabled={loading}
      >
        {loading ? (
          <span className="loading loading-bars loading-xs"></span>
        ) : (
          <LuUpload />
        )}
      </button>
    </div>
  );
}
