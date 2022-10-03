class UI {
  constructor() {
  this.showAlert = function(message, classname) {
      const div = document.createElement("div")
      div.className = classname
      div.appendChild(document.createTextNode(message))
      const alertend = document.querySelector(".alert-end")
      document.querySelector(".alert-head").insertBefore(div, alertend)
    }
  }
}
const ui = new UI

 module.exports = ui
