//import { Tikiti } from "./framework/tikiti/index";
//import SlideSideMenu from "./framework/slide/index";
//import App from './framework/md/App'
//import App from './example'
//import SilverDashboard from './framework/widgets/SilverDashboard/Example';
//Tikiti.Init(new App());


/*
TODOS:
- scss planning
- Side Nav animations
- Page switch animations
-
*/

//============================================================
import parser from 'html2hscript';

function h(type, props, ...children) {
    return { type, props: props || {}, children };
  }
  
  function setBooleanProp($target, name, value) {
    if (value) {
      $target.setAttribute(name, value);
      $target[name] = true;
    } else {
      $target[name] = false;
    }
  }
  
  function removeBooleanProp($target, name) {
    $target.removeAttribute(name);
    $target[name] = false;
  }
  
  function isEventProp(name) {
    return /^on/.test(name);
  }
  
  function extractEventName(name) {
    return name.slice(2).toLowerCase();
  }
  
  function isCustomProp(name) {
    return isEventProp(name) || name === 'forceUpdate';
  }
  
  function setProp($target, name, value) {
    if (isCustomProp(name)) {
      return;
    } else if (name === 'className') {
      $target.setAttribute('class', value);
    } else if (typeof value === 'boolean') {
      setBooleanProp($target, name, value);
    } else {
      $target.setAttribute(name, value);
    }
  }
  
  function removeProp($target, name, value) {
    if (isCustomProp(name)) {
      return;
    } else if (name === 'className') {
      $target.removeAttribute('class');
    } else if (typeof value === 'boolean') {
      removeBooleanProp($target, name);
    } else {
      $target.removeAttribute(name);
    }
  }
  
  function setProps($target, props) {
    Object.keys(props).forEach(name => {
      setProp($target, name, props[name]);
    });
  }
  
  function updateProp($target, name, newVal, oldVal) {
    if (!newVal) {
      removeProp($target, name, oldVal);
    } else if (!oldVal || newVal !== oldVal) {
      setProp($target, name, newVal);
    }
  }
  
  function updateProps($target, newProps, oldProps = {}) {
    const props = Object.assign({}, newProps, oldProps);
    Object.keys(props).forEach(name => {
      updateProp($target, name, newProps[name], oldProps[name]);
    });
  }
  
  function addEventListeners($target, props) {
    Object.keys(props).forEach(name => {
      if (isEventProp(name)) {
        $target.addEventListener(
          extractEventName(name),
          props[name]
        );
      }
    });
  }
  
  function createElement(node) {
    if (typeof node === 'string') {
      return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);
    setProps($el, node.props);
    addEventListeners($el, node.props);
    node.children
      .map(createElement)
      .forEach($el.appendChild.bind($el));
    return $el;
  }
  
  function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
           typeof node1 === 'string' && node1 !== node2 ||
           node1.type !== node2.type ||
           node1.props && node1.props.forceUpdate;
  }
  
  function updateElement($parent, newNode, oldNode, index = 0) {
    if (!oldNode) {
      $parent.appendChild(
        createElement(newNode)
      );
    } else if (!newNode) {
      $parent.removeChild(
        $parent.childNodes[index]
      );
    } else if (changed(newNode, oldNode)) {
      $parent.replaceChild(
        createElement(newNode),
        $parent.childNodes[index]
      );
    } else if (newNode.type) {
      updateProps(
        $parent.childNodes[index],
        newNode.props,
        oldNode.props
      );
      const newLength = newNode.children.length;
      const oldLength = oldNode.children.length;
      for (let i = 0; i < newLength || i < oldLength; i++) {
        updateElement(
          $parent.childNodes[index],
          newNode.children[i],
          oldNode.children[i],
          i
        );
      }
    }
  }

// ---------------------------------------------------------------------

const $root = document.getElementById('root');
const $reload = document.getElementById('reload');
let a = document.createElement('div')

a.innerText = "Hi"
a.style.width = "300px"

let b = document.createElement('div')
//b.innerText = "Hello"
let c = document.createElement('button')
c.innerText = "Click Me"
c.style.width = "300px"
c.onclick = () => { console.log("Works") }
b.appendChild(c)

parser(a.innerHTML,
    function (_err, newTree) {
        a = eval(newTree)
    });

parser(b.innerHTML,
    function (_err, newTree) {
        b = eval(newTree)
    });

updateElement($root, a);
$reload.addEventListener('click', () => {
    updateElement($root, b, a);
});





















