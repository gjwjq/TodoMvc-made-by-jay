const input = document.querySelector("input");
const delAll = document.querySelector(".delAll");
const ul = document.querySelector("ul");
const lis = [...document.querySelectorAll("li")];
const ps = [...document.querySelectorAll(".pWrap>a")];
const cab = document.querySelector(".checkAllBtn");
const option = document.querySelector(".option");
const remain = document.querySelector(".remain");
const clearCompleted = document.querySelector(".clear-completed");

// 인풋에 받은 값을 gen버튼을 누르면 li를만들고 그 안에 인풋 값을 넣고 ul안에 넣어야함 그리고 del 누르면 그게 지워짐 delAll누르면 다지워짐
//~~완료~~

// const gen = document.querySelector('.gen')
//gen.addEventListener('click', () => {
//    todolist()
//})
input.addEventListener("blur", () => {
  todolist();
});
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    todolist();
  }
});

ps.forEach((e) => {
  e.addEventListener("click", () => {
    ps.forEach((e2) => {
      e2.classList.remove("checked");
    });
    e.classList.add("checked");

    const todoItems = document.querySelectorAll("ul > div");
  });
});

//todolist 함수 시작

function todolist() {
  // const liArr = JSON.parse(localStorage.getItem('data')) || []

  if (!input.value.trim()) {
    return;
  }
  const todoWrap = document.createElement("div");
  const li = document.createElement("li");
  const del = document.createElement("p");
  const check = document.createElement("p");
  // let isCheck = false; class 추가방식으로 바꿔서 필요없음ㅁ
  //let isShown = true

  li.textContent = input.value;
  del.textContent = "X";
  check.textContent = "□"; //▣

  del.classList.add("del");
  check.classList.add("check");

  // const checks = document.querySelectorAll(".check");
  // console.log(checks);

  todoWrap.appendChild(check);
  todoWrap.appendChild(li);
  todoWrap.appendChild(del);
  ul.appendChild(todoWrap);

  input.value = "";

  console.log(li);

  del.addEventListener("click", () => {
    todoWrap.remove();
    // ul.removeChild(todoWrap)
    allFunctions();
  });

  // checks.forEach((e) => {
  //   e.addEventListener("click", () => {
  //     checks.forEach((e2) => {
  //       isCheck = !isCheck;

  //       e2.check.textContent = isCheck ? "▣" : "□";
  //     });
  //   });
  // });

  check.addEventListener("click", (e) => {
    const isChecked = li.classList.toggle("checked");

    check.textContent = isChecked ? "▣" : "□";

    allFunctions();
  });

  // cab.addEventListener("click", () => {
  //   isCheck = !isCheck;
  //   li.classList.remove("checked");
  //   check.textContent = "□";

  //   if (isCheck === true) {
  //     li.classList.add("checked");
  //     check.textContent = "▣";
  //   } else if (li.classList.contains('checked')) {

  //   } else {
  //     li.classList.remove("checked");
  //     check.textContent = "□";
  //   }
  //   hrefCheck();
  // });

  todoWrap.addEventListener("mouseenter", () => {
    //isShown = !isShown
    //del.style.opacity = isShown ? '0' : '1'

    del.style.opacity = "1";
  });

  todoWrap.addEventListener("mouseleave", () => {
    del.style.opacity = "0";
  });

  li.addEventListener("dblclick", (e) => {
    const edit = document.createElement("input");

    edit.value = li.textContent;
    li.textContent = "";
    li.appendChild(edit);
    edit.classList.add("edit");

    edit.focus();
    function editFunction() {
      if (!edit.value.trim()) {
        todoWrap.remove();
        allFunctions()
      } else {
        li.textContent = edit.value;
      }
    }

    edit.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        editFunction();
      }
    });
    edit.addEventListener("blur", () => {
      editFunction();
    });
  });
 allFunctions()
}

//todolist 함수 끝

delAll.addEventListener("click", () => {
  const todoItems = document.querySelectorAll("ul > div");
  todoItems.forEach((e) => {
    e.remove();
  });
  allFunctions();
});

cab.addEventListener("click", () => {
  const todoWrap = document.querySelectorAll("ul > div");
  const checkedLi = document.querySelectorAll("ul > div > li.checked");
  const completed = todoWrap.length !== checkedLi.length

  todoWrap.forEach((e) => {
    const li = e.querySelector("li");
    const check = e.querySelector(".check");

    li.classList.toggle('checked', completed) // todowrap과 checkedli의 길이가 같지 않으면? checked class 추가 / 같으면 checked class 삭제
    check.textContent =  completed ? '▣' : '□'
    
    //toggle 안쓴버전
    // if (todoWrap.length === checkedLi.length) {
    //   li.classList.remove("checked");
    //   check.textContent = "□"; //▣
    // } else {
    //   li.classList.add("checked");
    //   check.textContent = "▣"; //▣
    // }
  });
  allFunctions();
});

clearCompleted.addEventListener("click", () => {
  const checkedLi = document.querySelectorAll("ul > div > li.checked");

  checkedLi.forEach((e) => {
    e.parentElement.remove();
  });
  allFunctions();
});

 function clearShown() {
    const checkedLi = document.querySelectorAll("ul > div > li.checked");

    const isHidden = checkedLi.length === 0

    clearCompleted.classList.toggle('hidden', isHidden)

    // clearCompleted.style.display = checkedLi.length > 0 ? "flex" : "none";
  }

  function changeRemainText() {
    // (예시) hello클래스가 없는 div 찾으려면 div:not(.hello)
    const activeLi = document.querySelectorAll(`ul > div > li:not(.checked)`);
    const count = activeLi.length;
    const itemText = count === 1 ? "item" : "items";

    remain.textContent = `${count} ${itemText} left`;
  }
  function cabOpacity() {
    const todoWrap = document.querySelectorAll("ul > div");
    const checkedLi = document.querySelectorAll("ul > div > li.checked");
    if (todoWrap.length === checkedLi.length) {
      cab.style.opacity = "1";
    } else {
      cab.style.opacity = "0.4";
    }
  }
  function optionShown() {
    const todoItems = document.querySelectorAll("ul>div");
    if (todoItems.length > 0) {
      option.classList.remove("hidden");
      cab.classList.remove("hidden");
      delAll.classList.remove("hidden");
    } else {
      option.classList.add("hidden");
      cab.classList.add("hidden");
      delAll.classList.add("hidden");
    }
  }
  function hrefCheck() {
    const todoItems = [...document.querySelectorAll("ul > div")];
    const hashNow = location.hash;

    todoItems.forEach((e) => {
      const checkConfirm = e.querySelector("li").classList.contains("checked");

      if (hashNow === "#/active") {
        if (checkConfirm) {
          e.classList.add("hidden");
        } else {
          e.classList.remove("hidden");
        }
      } else if (hashNow === "#/completed") {
        if (checkConfirm) {
          e.classList.remove("hidden");
        } else {
          e.classList.add('hidden')
        }
      } else {
        e.classList.remove('hidden')
      }
    });
  }
function allFunctions() {
  clearShown();
  changeRemainText();
  cabOpacity();
  optionShown();
  hrefCheck();
}

function aStyle() {
  const hashNow = location.hash || "#/";

  ps.forEach((e) => {
    if (e.getAttribute("href") === hashNow) {
      e.classList.add("checked");
    } else {
      e.classList.remove("checked");
    }
  });
}
window.addEventListener("hashchange", (e) => {
  hrefCheck();
  aStyle();
});

window.addEventListener("DOMContentLoaded", () => {
  aStyle();
});
