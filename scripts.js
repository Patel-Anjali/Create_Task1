var arr = [];
row = null;
// localStorage.clear();

function submitbtn() {
  debugger;
  if (row == null) {
    var enteredData = addData();
    storeLocalStoreage(enteredData);
    insert(enteredData);
    resetData();
  } else {
    update();
  }
  resetData();
}

function addData() {
  debugger;
  const personDtl = {
    Id: document.getElementById("id").value,
    Name: document.getElementById("name").value,
    Status: document.getElementById("status").value,
    startTime: document.getElementById("startTime").value,
    endTime: document.getElementById("endTime").value,
  };

  return personDtl;
}

function storeLocalStoreage(data) {
  debugger;
  arr.push(data);
  localStorage.setItem("CreateTask", JSON.stringify(arr));
}

function insert(data) {
  debugger;

  var tbody = document.getElementById("tablebody");
  var row = document.createElement("tr");
  var idCell = document.createElement("td");
  var nameCell = document.createElement("td");
  var statusCell = document.createElement("td");
  var stmCell = document.createElement("td");
  var etmCell = document.createElement("td");
  var actionCell = document.createElement("td");

  // setId();
  // idCell.innerText = data.Id;
  nameCell.innerText = data.Name;
  statusCell.innerText = data.Status;
  stmCell.innerText = data.startTime;
  etmCell.innerText = data.endTime;
  actionCell.innerHTML = `<button class="btn btn-primary" onclick="edit(this)">Edit</button>&nbsp;
                            <button class="btn btn-light" onclick="remove(this)">Delete</button>`;

  tbody.appendChild(row);
  row.appendChild(idCell);
  row.appendChild(nameCell);
  row.appendChild(statusCell);
  row.appendChild(stmCell);
  row.appendChild(etmCell);
  row.appendChild(actionCell);
  row = null;
}

window.addEventListener("load", function () {
  debugger;
  var getData = localStorage.getItem("CreateTask");
  arr = getData ? JSON.parse(getData) : [];

  arr.forEach(function (data) {
    insert(data);
  });
});

function edit(td) {
  debugger;
  row = td.parentElement.parentElement;

  document.getElementById("id").value = row.cells[0].innerText;
  document.getElementById("name").value = row.cells[1].innerText;
  document.getElementById("status").value = row.cells[2].innerText;
  document.getElementById("startTime").value = row.cells[3].innerText;
  document.getElementById("endTime").value = row.cells[4].innerText;
}

function remove(td) {
  debugger;
  var message = confirm("Are you sure delete some data?");
  if (message === true) {
    var row = td.parentElement.parentElement;
    var index = Array.from(row.parentElement.children).indexOf(row);
    row.remove();
    arr.splice(index, 1);
    localStorage.setItem("CreateTask", JSON.stringify(arr));
    row = null;
  }
}

function update() {
  // debugger;
  var num = arr[indexNo];
  document.getElementById("id").value = num;
  var updateData = addData();
  var indexNo = Array.from(row.parentElement.children).indexOf(row);
  arr[indexNo] = updateData;
  localStorage.setItem("CreateTask", JSON.stringify(arr));

  row = null;
  location.reload();
}

function resetData() {
  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("status").value = "";
  document.getElementById("startTime").value = "";
  document.getElementById("endTime").value = "";
}

function searchItems() {
  debugger;
  var input, filter, found, table, tr, td, i, j;
  input = document.getElementById("searchItem");
  filter = input.value.toUpperCase();
  table = document.getElementById("table1");
  tr = table.getElementsByTagName("tr");

  for (let i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td");

    for (let j = 0; j < td.length; j++) {
      if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
        found = true;
      }
    }

    if (found) {
      tr[i].style.display = "";
      found = false;
    } else {
      tr[i].style.display = "none";
    }
  }
}

 var ascendingOrder=true;

  function clickName() {
    debugger;
    ascendingOrder=!ascendingOrder;
   
  if (ascendingOrder) {
    arr.sort(function(a,b) {
      if (a.name < b.name) {
        return -1;
      } 
      if (a.name > b.name) {
        return 1;
      }
      localStorage.setItem("CreateTask", JSON.stringify(arr));
      return 0;
      });
  } else {
    arr.reverse();
    localStorage.setItem("CreateTask", JSON.stringify(arr));

  }
  location.reload();
}

function clickStatus() {
    debugger;
    ascendingOrder=!ascendingOrder
  
if (ascendingOrder) {
  arr.sort(function(a,b) {
    if (a.Status < b.Status) {
      return 1;
    } 
    if (b.Status > a.Status){
      return -1;
    }
    localStorage.setItem("CreateTask", JSON.stringify(arr));
    return 0;
    });
} else {
  arr.reverse();
  localStorage.setItem("CreateTask", JSON.stringify(arr));

}
location.reload();
}

