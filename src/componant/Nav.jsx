import { useState, useEffect } from "react";
import "../style/Nav.css";
import "../style/selectTags.css";
import Tags from "./tags/Tags";
import { Link } from "react-router-dom";
import { getUserTaskStr } from "../services/userStrService";

function Nav({ currUser }) {
  const [userStr, setUserStr] = useState({
    list: [],
    tags: [],
  });
  const [lists, setLists] = useState([
    {
      list: "personal",
      style: { backgroundColor: "red" },
    },
    {
      list: "work",
      style: { backgroundColor: "blue" },
    },
  ]);
  const [listStyle, setListstyle] = useState({
    width: "10px",
    height: "10px",
    borderRadius: "5px",
    backgroundColor: "red",
  });

  async function getStr() {
    try {
      const res = await getUserTaskStr();
      setUserStr(res.userStr);
    } catch (error) {
      if (error.isAppError) {
        console.error(
          `AppError - Code: ${error.code}, Message: ${error.message}`,
        );
      } else {
        console.error("Unexpected Error:", error);
      }
      setUserStr({
        list: [],
        tags: [],
      });
    }
  }
  useEffect(() => {
    getStr();
  }, []);
  return (
    <div className="Nav-div">
      <div className="menu">
        <h4>{currUser}</h4>
        <span>
          <img
            src="https://res.cloudinary.com/ddg85vpnk/image/upload/v1739965627/menu_huhrht.png"
            alt=""
            width={20}
            height={20}
          />
        </span>
      </div>
      {/* <div className="search-bar">
        <input className="inputBox-search" placeholder="Search" type="text" />
      </div> */}
      <nav>
        <span>Tasks</span>
        <ul>
          <li>
            <div className="section-div">
              <div className="icon-div">
                <img
                  src="https://res.cloudinary.com/ddg85vpnk/image/upload/v1739965625/checklist_nm8ohn.png"
                  alt=""
                  width={20}
                  height={20}
                />
                <Link to="/">Today</Link>
              </div>
            </div>
          </li>
          <li>
            <div className="section-div">
              <div className="icon-div">
                <img
                  src="https://res.cloudinary.com/ddg85vpnk/image/upload/v1739965625/fast-forward-double-right-arrows-symbol_sw9wzj.png"
                  alt=""
                  width={15}
                  height={15}
                />
                <Link to="/Upcoming">Upcoming</Link>
              </div>
            </div>
          </li>

          <li>
            <div className="icon-div">
              <img
                src="https://res.cloudinary.com/ddg85vpnk/image/upload/v1739965624/dollar_fn9t4e.png"
                alt=""
                width={15}
                height={15}
              />
              <Link to="/Expenses">Expenses</Link>
            </div>
          </li>
        </ul>
      </nav>
      <nav>
        <span>Lists</span>
        <ul>
          {lists.map((item, index) => (
            <li key={index}>
              <div className="section-div">
                <div className="icon-div">
                  <div style={{ ...listStyle, ...item.style }}></div>
                  <Link to={`/Lists/${item.list}`}>{item.list}</Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="nav-tags">
          <Tags />
        </div>
      </nav>
    </div>
  );
}

export default Nav;
