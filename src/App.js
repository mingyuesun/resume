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
            return_arr.push(
              {
                value: v.slice(0, i) +
                ("[" + elements.default[j].name + "]") +
                v.slice(i + 1),
                element: elements.default[j]
              }
            );
          }
          if (i < v_arr.length - 1) {
            if (
              v_arr[i].toUpperCase() + v_arr[i + 1].toLowerCase() ===
              elements.default[j].name
            ) {
              return_arr.push(
                {
                 value: v.slice(0, i) +
                  ("[" + elements.default[j].name + "]" + v.slice(i + 2)),
                 element: elements.default[j]
                }
              );
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
      input_arr = e.target.value.split(" ");
    }

    let arr1 = [];
    let arr2 = [];
    if (input_arr.length % 2 === 0) {
      select_one = input_arr.slice(0, input_arr.length / 2);
      select_two = input_arr.slice(input_arr.length / 2);
      this.handleArray(select_one, arr1);
      this.handleArray(select_two, arr2);
    } else {
      select_one = input_arr.slice(0, (input_arr.length + 1) / 2);
      select_two = input_arr.slice((input_arr.length + 1) / 2);
      this.handleArray(select_one, arr1);
      this.handleArray(select_two, arr2);
    }
    this.setState({
      select_one: arr1,
      select_two: arr2
    });
    if (arr1.length) {
      this.setState({
        first_rect: arr1[0].element
      })
    }
    if (arr2.length) {
      this.setState({
        second_rect: arr2[0].element
      })
    }
  };

  changeFirstSelect = index => {
    const { select_one } = this.state
    this.setState({
      first_select_option: select_one[index].value,
      first_rect: select_one[index].element
    })
  };

  changeSecondSelect = index => {
    const { select_two } = this.state
    this.setState({
      second_select_option: select_two[index].value,
      second_rect: select_two[index].element
    })
  };

  render() {
    const { select_one, select_two, first_rect, second_rect, first_select_option, second_select_option } = this.state;

    return (
      <Root className="App">
        <div className="content">
          <header>
            <div className="left">
              <input
                className="input"
                type="text"
                placeholder="please input words..."
                onChange={this.onChange}
              />
            </div>
            <div className="right">
              <div className="select select-one">
                <p>第一组匹配:</p>
                <select
                  onChange={e => this.changeFirstSelect(e.target.value)}
                  value={first_select_option}
                >
                  {select_one &&
                    select_one.map((o, i) => (
                      <option value={i} key={i}>
                        {o.value}
                      </option>
                    ))}
                </select>
              </div>
              <div className="select select-two">
                <p>第二组匹配:</p>
                <select
                  onChange={e=>this.changeSecondSelect(e.target.value)}
                  value={second_select_option}
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
          <main>
            <div className="smoke">
              <div className="element-rect">
                {first_rect && (
                  <div className="rect rect-top">
                    <div className="top">
                      <p>{first_rect.quality}</p>
                      <p>
                        {
                          first_rect.cv && first_rect.cv.map(c => (
                            <li key={c}>{c}</li>
                          ))
                        }
                      </p>
                    </div>
                    <div className="middle">{first_rect.name}</div>
                    <div className="bottom">{first_rect.index}</div>
                  </div>
                )}
                {second_rect && (
                  <div className="rect rect-bottom">
                    <div className="top">
                    <p>{second_rect.quality}</p>
                      <p>
                        {
                          second_rect.cv && second_rect.cv.map(c => (
                            <li key={c}>{c}</li>
                          ))
                        }
                      </p>
                    </div>
                    <div className="middle">{second_rect.name}</div>
                    <div className="bottom">{second_rect.index}</div>
                  </div>
                )}
              </div>
            </div>
          </main>
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
  }
  header .left .input {
    padding: 5px;
    font-size: 16px;
    width: 300px;
  }
  header .right {
    display: flex;
    justify-content: space-between;
    line-height: 15px;
  }
  header .right .select p {
    color: #fff;
    font-size: 14px;
  }
  header .right .select select {
    width: 100px;
  }
  header .right .select-one {
    margin-right: 20px;
  }
  main {
    margin: 0 auto;
    border: 2px solid lightGreen;
    margin-top: 20px;
    width: 960px;
    height: 600px;
    background: url(${bgImg}) no-repeat center;
    background-attachment: fixed;
  }
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
  main .smoke .element-rect {
    width: 272px;
    height: 272px;
  }
  main .smoke .element-rect .rect {
    padding: 5px;
    color: #fff;
    width: 136px;
    height: 136px;
    border: 1px solid #ccc;
    .top {
      display: flex;
      justify-content: space-between;
      p {
        margin: 0;
      }
      li {
        list-style: none;
      }
    }
    .middle {
      font-size: 65px;
    }
    .bottom {
      text-align: left;
    }
  }
  main .smoke .element-rect .rect-top {
    background: linear-gradient(rgba(85, 255, 131, 0.12), rgba(3, 3, 3, 0.5));
  }
  main .smoke .element-rect .rect-bottom {
    margin-left: 137px;
    background: rgba(87, 209, 139, 0.1);
  }
`;
