// const router = new VueRouter();

var app = new Vue({
  el: '#Web_1920___home',
  data: {
    message: 'Hello Vue!',
    checkedNeeds: [],
    zipcode: null,
    errors: null,
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ],
    navFindCustomers: function () {
      console.log(this.navFindCustomers.name + this.zipcode)
      if (!this.zipcode) {
        this.errors = "Missing zipcode";
        return
      }
      this.errors = null;

      // router.go({ path: 'path/findCustomers.html', query: { zipcode: this.zipcode } })
      if (location.pathname.indexOf("dist") != -1) {
        location.href = "/dist/pages/findCustomers.html?zipcode=" + this.zipcode;
      } else
        location.href = "/pages/findCustomers.html?zipcode=" + this.zipcode;

    },
    navResources: function () {
      console.log(this.navResources.name + this.zipcode)
    },
    request: function () {
      console.log("request")
    },
    offer: function () {
      console.log("request")
    },
    toggleMenu: function () {
      var x = document.getElementById("myNavbar");
      if (x.className === "collapse navbar-collapse") {
        x.className = "navbar";
      } else {
        x.className = "collapse navbar-collapse";
      }
    }
  }
})