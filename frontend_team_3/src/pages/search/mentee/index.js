import React, { useState } from "react";
import '../style.css';
import FilterMentee from "./filter";
import { IoFilterOutline } from "react-icons/io5";

const SearchMentee = () => {
  // Toogle in mobile view
  const [mobileToggle, setmobileToggle] = useState(true);
  // Cheack boxes
  const [Availlable, setAvaillable] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [arrayOfDivs, setarrayOfDivs] = useState([]);
  const [locvalue, setlocvalue] = useState("cairo");
  let [skills, setskills] = useState([]);
  function handleReset() {
    setarrayOfDivs([]);
    setskills([]);
  }
  function addSkill() {
    arrayOfDivs.push(
      <span className="me-2 mt-2 d-inline-block  custom-padding rounded bg-secondaryColor-op text-white">
        {inputValue}
      </span>
    );
    setarrayOfDivs(arrayOfDivs);
    skills.push(inputValue);
    setskills(skills);
    setInputValue("");
  }
  return (
    <>
      <div className="mentor p-md-5 p-4">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-12">
              {/* Headings */}
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="fw-bold h4">Filters</h3>
                <button className="small bg-transparent border-0 d-none d-sm-block">
                  Clear All
                </button>
                <button
                  className="small bg-transparent border-0 d-sm-none text-main-color "
                  onClick={() =>
                    setmobileToggle((mobileToggle) => !mobileToggle)
                  }
                >
                  <IoFilterOutline className="h2 fw-bold" />
                </button>
              </div>
              {/* Check boxes */}
              <div
                className={
                  mobileToggle ? "d-none d-sm-block mt-3" : "d-sm-block mt-3"
                }
              >
                <div className="form-check ps-0">
                  <label
                    className="form-check-label small "
                    htmlFor="flexCheckDefault"
                  >
                    Availlable for Hiring
                  </label>
                  <input
                    className="form-check-input float-end"
                    onChange={() => setAvaillable((Availlable) => !Availlable)}
                    type="checkbox"
                    id="flexCheckDefault"
                  />
                </div>
              </div>

              {/* Location */}
              <div
                className={
                  mobileToggle ? "mt-5 d-none d-sm-block" : "mt-5 d-sm-block"
                }
              >
                <h6 className="fw-bold ">Location</h6>
                <div className="d-flex justify-content-center align-items-center">
                  <select
                    id="selectedtwo"
                    className="form-select bg-red m-0 d-inline-block  ps-2 selecteList-mentor"
                    defaultValue="cairo"
                    onChange={(e) => setlocvalue(e.target.value)}
                    aria-label="Default select example"
                  >
                    <option value="cairo" className="bg-secondaryColor-op p-2 ">
                      Cairo
                    </option>
                    <option
                      value="giza"
                      className="bg-secondaryColor-op p-2 fw-bold"
                    >
                      Giza
                    </option>
                    <option
                      value="alex"
                      className="bg-secondaryColor-op p-2 fw-bold"
                    >
                      Alex
                    </option>
                  </select>
                  <span className="arrow arrow-mentor  d-inline-block mt-2"></span>
                </div>
              </div>

              {/* Skills */}
              <div
                className={
                  mobileToggle
                    ? "mt-5 d-none skills d-sm-block"
                    : "mt-5 skills d-sm-block"
                }
              >
                <h5 className="small text-sec-color">Skills</h5>
                <p className="skillsField mb-2 text-gray">
                  {arrayOfDivs.length ? arrayOfDivs.map((item) => item) : ""}
                </p>
                <input
                  placeholder="Add Skill"
                  type="text"
                  value={inputValue}
                  onChange={(e) =>
                    setInputValue(e.target.value.toLocaleLowerCase())
                  }
                  className="outlint-focus"
                />
                <div>
                  <button
                    onClick={addSkill}
                    className="d-inline-block mt-4 border-0 bg-secondaryColor-op text-white rounded pad"
                  >
                    Add
                  </button>
                  <button
                    onClick={handleReset}
                    className="d-inline-block mt-4 ms-4 border-0 bg-secondaryColor-op text-white rounded pad"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
            {/* Mentors */}
            <div className="col-md-9 col-12">
              <div className="row">
                <FilterMentee
                  Availlable={Availlable}
                  locvalue={locvalue}
                  skills={skills}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchMentee;
