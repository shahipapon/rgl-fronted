
const dateFormatScipt = `
console.log("initialized");
let selectedDate,
   year,
   month,
   date = "";

let monthLong = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
];
let monthShort = [
   "Jan",
   "Feb",
   "Mar",
   "Apr",
   "May",
   "June",
   "July",
   "Aug",
   "Sept",
   "Oct",
   "Nov",
   "Dec",
];

let showDate = document.getElementById("showDate");
document.getElementById("date").onchange = function () {
   let attribute = document
      .getElementById("date")
      .getAttribute("customDateFormat");

   myFunction(attribute);
};

function myFunction(type) {
   selectedDate = document.getElementById("date").value;

   let dateSplit = selectedDate.split("-");

   year = dateSplit[0];
   month = dateSplit[1]; //num -01
   date = dateSplit[2]; //num-02

   (type === "Default") | (type === "") && yyyyDDmm();
   type === "dd:MM:yyyy" && ddMMyyyy();
   type === "dd-LongM-yyyy" && month_long();
   type === "ShortM,dd,yyyy" && month_short();
}

function yyyyDDmm() {
   showDate.innerHTML = "Selected  Date:  " + selectedDate;
}
function ddMMyyyy() {
   showDate.innerHTML = "Selected  Date:  " + date + ":" + month + ":" + year;
}

function month_long() {
   showDate.innerHTML =
      "Selected  Date:    " + date + "-" + monthLong[month - 1] + "-" + year;
}

function month_short() {
   showDate.innerHTML =
      "Selected  Date:  " + monthShort[month - 1] + ", " + date + ", " + year;
}


`

export default dateFormatScipt
