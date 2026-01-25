import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addtag } from "../../services/userStrService";
import { plusPng } from "../../assets/assets";
import { getUserTags } from "../../services/userStrService";

function Tags() {
  const [tags, setTags] = useState([]);
  const [isTagInputDiv, setIsTagInputDiv] = useState(false);
  const [tagInputValue, setTagInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refetchTag, setRefetchTag] = useState(false);


  async function getTages() {
    setIsLoading(true);
    try {
      const tags = await getUserTags();
      console.log("tags:", tags);
      setTags(tags);
    } catch (error) {
      if(error.isAppError){
        alert(`Error: ${error.message} (Code: ${error.code})`);
      }else{
        alert("An unexpected error occurred.");
      }
    }finally{
      setIsLoading(false);
    }
  }

  async function saveTag() {
    if (!tagInputValue) {
      alert("enter something");
      return;
    }
    try {
      await addtag(tagInputValue);
    } catch (err) {
      if(err.isAppError){
        alert(`Error: ${err.message} (Code: ${err.code})`);
      }else{
        alert("An unexpected error occurred.");
      }
    }finally{
      setTagInputValue("");
      setRefetchTag((prev)=>!prev);
    }
  }


    useEffect(() => {
    getTages();
  }, [refetchTag]);

if(isLoading){
  return <div>Loading...</div>
}
  return (
    <div>
      <div className="nav-tagTitle">
        <p>Tags</p>
        <img
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsTagInputDiv(true);
          }}
          src={plusPng}
          alt=""
          width={15}
          height={15}
        />
      </div>
      {tags.length > 0 ? (
        <div className="nav-tagitemDiv">
          {tags.map((tag, i) => (
            <div className="nav-tagitem" key={i}>
              <Link to={`/Tags/${tag}`}>{tag}</Link>
            </div>
          ))}
        </div>
      ) : (
        <div>Add tags</div>
      )}
      {isTagInputDiv && (
        <div className="nav-tagInputDiv">
          <input
            value={tagInputValue}
            onChange={(e) => setTagInputValue(e.target.value)}
            className="tag-input"
            type="text"
          />
          <button className="baseBtnClass" onClick={saveTag}>
            save
          </button>
          <button className="baseBtnClass" onClick={() => setIsTagInputDiv(false)}>
            cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default Tags;
