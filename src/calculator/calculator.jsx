import React, { useRef, useEffect, useState } from "react";

import "./calculator.css";

import { btns, BTN_ACTIONS } from "./btnConfig";

const Calculator = () => {
  const btnsRef = useRef(null);
  const expRef = useRef(null);

  const [expression, setExpression] = useState("");

  useEffect(() => {
    const btns = Array.from(btnsRef.current.querySelectorAll("button"));
    btns.forEach((e) => (e.style.height = e.offsetWidth + "px"));
  }, []);

  const btnClick = (item) => {
    const expDiv = expRef.current;

    if (item.action === BTN_ACTIONS.THEME)
      document.body.classList.toggle("dark");

    if (item.action === BTN_ACTIONS.ADD) {
      addAnimSpan(item.display);

      const oper = item.display !== "x" ? item.display : "*";
      setExpression(expression + oper);
    }

    if (item.action === BTN_ACTIONS.DELETE) {
      expDiv.parentNode.querySelector("div:last-child").innerHTML = "";
      expDiv.innerHTML = "";

      setExpression("");
    }

    if (item.action === BTN_ACTIONS.CALC) {
      if (expression.trim().length <= 0) return;

      expDiv.parentNode.querySelector("div:last-child").remove();

      const cloneNode = expDiv.cloneNode(true);
      expDiv.parentNode.appendChild(cloneNode);

      const transform = `translateY(${
        -(expDiv.offsetHeight + 10) + "px"
      }) scale(0.4)`;

      try {
        let res = eval(expression);

        setExpression(res.toString());
        setTimeout(() => {
          cloneNode.style.transform = transform;
          expDiv.innerHTML = "";
          addAnimSpan(Math.floor(res * 100000000) / 100000000);
        }, 200);
      } catch {
        setTimeout(() => {
          cloneNode.style.transform = transform;
          cloneNode.innerHTML = "Syntax err";
        }, 200);
      } finally {
        console.log("calc complete");
      }
    }
  };

  const addAnimSpan = (content) => {
    const expDiv = expRef.current;
    const span = document.createElement("span");

    span.innerHTML = content;
    span.style.opacity = "0";
    expDiv.appendChild(span);

    const width = span.offsetWidth + "px";
    span.style.width = "0";

    setTimeout(() => {
      span.style.opacity = "1";
      span.style.width = width;
    }, 100);
  };

  return (
    <div className="calculator p-5 h-[43.75rem] w-[25rem] overflow-hidden rounded-3xl bg-calc-bg shadow-2xl flex flex-col justify-end max-[800px]:w-[100%] max-[800px]:h-[100vh] max-[800px]:rounded-[0]">
      <div className="calculator__result relative mb-[20px] text-right flex flex-col items-end justify-end text-calc-res-color">
        <div ref={expRef} className="calculator__result__exp"></div>
        <div className="calculator__result__exp "></div>
      </div>
      <div
        ref={btnsRef}
        className="calculator__btns grid grid-cols-[repeat(4,_1fr)] gap-[10px]"
      >
        {btns.map((item, index) => (
          <button
            key={index}
            className={`${item.class} border-0 outline-0 rounded-[10px] text-[1.25rem] font-[500] bg-transparent text-txt-color last:rounded-[50%] last:text-txt-white last:bg-gradient-to-r from-purple-500 to-pink-500 `}
            onClick={() => btnClick(item)}
          >
            {item.display}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
