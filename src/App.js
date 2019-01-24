import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";
import bgImg from "./images/bg.jpg";
import smokeImg from "./images/smoke.png";
import * as elements from "./data.json";
class App extends Component {
  state = {
    inputArray: null,
    select_one: null,
    select_two: null,
    first_rect: null,
    second_rect: null,
    first_select_option: "",
    second_select_option: ""
  };

  handleArray = (arr, return_arr) => {
    arr.forEach(v => {
      let v_arr = v.split("");
      for (var i = 0; i < v_arr.length; i++) {
        for (var j = 0; j < elements.default.length; j++) {
          if (v_arr[i].toUpperCase() === elements.default[j].name) {
            return_arr.push({
              value:
                v.slice(0, i) +
                ("[" + elements.default[j].name + "]") +
                v.slice(i + 1),
              element: elements.default[j]
            });
          }
          if (i < v_arr.length - 1) {
            if (
              v_arr[i].toUpperCase() + v_arr[i + 1].toLowerCase() ===
              elements.default[j].name
            ) {
              return_arr.push({
                value:
                  v.slice(0, i) +
                  ("[" + elements.default[j].name + "]" + v.slice(i + 2)),
                element: elements.default[j]
              });
            }
          }
        }
      }
    });
  };

  onChange = e => {
    let { select_one, select_two } = this.state;
    if (!e.target.value) return;
    let input_arr = [];
    if (e.target.value.split(" ").length === 1) {
      input_arr = Array.of(e.target.value);
    } else {
      input_arr = e.target.value.trim().split(" ");
    }

    let arr1 = [];
    let arr2 = [];
    if (input_arr.length % 2 === 0) {
      select_one = input_arr
        .slice(0, input_arr.length / 2)
        .join(" ")
        .split();
      select_two = input_arr
        .slice(input_arr.length / 2)
        .join(" ")
        .split();
      this.handleArray(select_one, arr1);
      this.handleArray(select_two, arr2);
    } else {
      select_one = input_arr
        .slice(0, (input_arr.length + 1) / 2)
        .join(" ")
        .split();
      select_two = input_arr
        .slice((input_arr.length + 1) / 2)
        .join(" ")
        .split();
      this.handleArray(select_one, arr1);
      this.handleArray(select_two, arr2);
    }
    this.setState({
      select_one: arr1,
      select_two: arr2
    });
    if (arr1.length) {
      this.setState({
        first_rect: arr1[0].element,
        first_select_option: arr1[0].value
      });
    }
    if (arr2.length) {
      this.setState({
        second_rect: arr2[0].element,
        second_select_option: arr2[0].value
      });
    }
  };

  changeFirstSelect = index => {
    const { select_one } = this.state;
    let first_select_option = select_one[index].value
    this.setState({
      first_select_option,
      first_rect: select_one[index].element
    });
  };

  changeSecondSelect = index => {
    const { select_two } = this.state;
    this.setState({
      second_select_option: select_two[index].value,
      second_rect: select_two[index].element
    });
  };

  handleSliceStr = str => {
    if (!str) return;
    let str_arr = str.split("");
    let return_str = [];
    for (let i = 0; i < str_arr.length; i++) {
      if (str_arr[i] === "[") {
        return_str.push(str_arr.slice(0, i).join(""));
      }
      if (str_arr[i] === "]") {
        return_str.push(str_arr.slice(i + 1).join(""));
      }
    }
    return return_str;
  };

  render() {
    const {
      select_one,
      select_two,
      first_rect,
      second_rect,
      first_select_option,
      second_select_option
    } = this.state;

    return (
      <Root className="App">
        <div className="content">
          <header>
            <div className="left">
              <input
                type="text"
                placeholder="please input words..."
                onChange={this.onChange}
              />
            </div>
            <div className="right">
              <div>
                <p>第一组匹配:</p>
                <select
                  onChange={e => this.changeFirstSelect(e.target.value)}
                  // value={first_select_option}
                >
                  {select_one &&
                    select_one.map((o, i) => (
                      <option value={i} key={i}>
                        {o.value}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <p>第二组匹配:</p>
                <select
                  onChange={e => this.changeSecondSelect(e.target.value)}
                  // value={second_select_option}
                >
                  {select_two &&
                    select_two.map((o, i) => (
                      <option value={i} key={i}>
                        {o.value}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </header>
          <Main>
            <div className="smoke">
              <ElementRect>
                {first_rect && (
                  <div>
                    <p>
                      {first_select_option &&
                        this.handleSliceStr(first_select_option)[0]}
                    </p>
                    <div className="rect rect-top">
                      <div>
                        <p>{first_rect.quality}</p>
                        <p>{first_rect.index}</p>
                      </div>
                      <div>{first_rect.name}</div>
                      <div>
                        <p>
                          {first_rect.cv &&
                            first_rect.cv.map(c => <li key={c}>{c}</li>)}
                        </p>
                      </div>
                    </div>
                    <p>
                      {first_select_option &&
                        this.handleSliceStr(first_select_option)[1]}
                    </p>
                  </div>
                )}
                {second_rect && (
                  <div>
                    <p>
                      {second_select_option &&
                        this.handleSliceStr(second_select_option)[0]}
                    </p>
                    <div className="rect rect-bottom">
                      <div>
                        <p>{second_rect.quality}</p>
                        <p>{second_rect.index}</p>
                      </div>
                      <div>{second_rect.name}</div>
                      <div>
                        <p>
                          {second_rect.cv &&
                            second_rect.cv.map(c => <li key={c}>{c}</li>)}
                        </p>
                      </div>
                    </div>
                    <p>
                      {second_select_option &&
                        this.handleSliceStr(second_select_option)[1]}
                    </p>
                  </div>
                )}
              </ElementRect>
            </div>
          </Main>
        </div>
      </Root>
    );
  }
}

export default App;

const Root = styled.div`
  background-color: #000;
  height: 100vh;
  .content {
    padding: 30px 0;
  }
  header {
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    line-height: 80px;
    > div: first-child {
      input[type="text"] {
        padding: 5px;
        font-size: 16px;
        width: 300px;
      }
    }
    > div: last-child {
      display: flex;
      justify-content: space-between;
      line-height: 15px;
      div {
        > p {
          color: #fff;
          font-size: 14px;
        }
        select {
          width: 100%;
          min-width: 100px;
        }
      }
      >div: first-child {
        margin-right: 20px;
      }
    }
  }
`;

const Main = styled.div`
  margin: 20px auto;
  border: 2px solid lightGreen;
  width: 960px;
  height: 600px;
  background: url(${bgImg}) no-repeat center;
  background-attachment: fixed;
  background-size: cover;

  .smoke {
    background-size: 100%;
    background-attachment: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(${smokeImg}) no-repeat center right;
  }
`;

const ElementRect = styled.div`
  width: 100%;
  height: 272px;
  > div {
    display: flex;
    justify-content: center;
    > p {
      color: #fff;
      font-size: 40px;
    }
  }

  > div: first-child > p: first-child, > div: last-child > p: last-child {
    width: 333px!important;
  }

  > div: first-child > p: last-child, > div: last-child > p: first-child  {
    width: 469px!important;
  }

  > div: first-child > p: first-child, > div: last-child > p: first-child {
    text-align: right;
  }

  > div: first-child > p: last-child, > div: last-child > p: last-child {
    text-align: left;
  }

  .rect {
    padding: 5px;
    color: #fff;
    width: 124px;
    height: 124px;
    border: 1px solid #ccc;
    margin: 0 10px;
    display: flex;

    > div: first-child {
      width: 30%;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      p {
        margin: 0;
        text-align: left;
      }
    }

    > div: nth-child(2) {
      width: 40%;
      font-size: 65px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    > div: last-child {
      width: 30%;
      display: flex;
      justify-content: flex-end;
      p {
        margin: 0;
        li {
          list-style: none;
        }
      }
    }
  }

  .rect-top {
    background: linear-gradient(
      rgba(85, 255, 131, 0.12),
      rgba(3, 3, 3, 0.5)
    );
  }

  .rect-bottom {
    background: rgba(87, 209, 139, 0.1);
  }
`
