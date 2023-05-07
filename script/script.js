const inputArea = document.getElementById("inputArea");
const userInputs = inputArea.querySelectorAll("input");
const addButton = document.getElementById("eventbutton");

// declaring first ID's to events
let eventMapKeyID = 0;
let eventID = 0;

// storing event details and html dom in this map
const eventMap = new Map();

// creating event field function
const EVENT_FIELD_MAKER = () => {
  const renderHook = document.getElementById("allcontent");
  const eventContainer = document.createElement("div");
  eventContainer.id = "container";
  eventContainer.innerHTML = eventMap.get(eventID); // getting html details from map value by getting key
  renderHook.append(eventContainer);
  eventID++;
};

// creating blueprint via class
class EventListClass {
  constructor(title, description, date, imgUrl) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.imgUrl = imgUrl;
  }
  // new event button function, using what is inserted in blueprint's values
  addNewEventButton() {
    // checking fields is empty or not
    if (this.description == "" || this.title == "") {
      alert("Please enter the Title and Description");
      return;
    } else if (this.date == "") {
      alert("Please choose the Event date");
      return;
    } else {
      if (this.imgUrl == "") {
        this.imgUrl = "img/noimage.jpg"; // if there is no event image, it will assign a default one
      }
      // making event field via html with a specific key number can be deleted and getable for creating
      eventMap.set(eventMapKeyID,
        `
      <div id="imagearea">
          <img id="eventphoto" src="${this.imgUrl}">
        </div>
        <div id="contentarea">
          <div style="display: flex; flex-direction: column;">
            <b>Event Name: </b><span id="eventname">${this.title}</span><br>
            <b>Event Description: </b><span id="eventdate">${this.description}</span><br>
            <div style="display:block;">
            <div style="float:left"><b>Event Date: </b><span id="eventdate">${this.date}</span></div>
            <div class="delete"><span value="${eventMapKeyID}" id="deleteButton" onclick="deleteEventButton()">Delete Event</span></div>
            </div>
            </div>
          </div>
        </div>
      `
      );
      eventMapKeyID++; // declaring next event's ID
      EVENT_FIELD_MAKER(); // creating event field in html
    }
  }
}

// selecting Add New Event button and assigning it to function for declaring values, making event, creating field etc.
addButton.addEventListener('click', function() {
  const ADD_EVENT_WITH_VALUES = new EventListClass(userInputs[0].value, userInputs[1].value, userInputs[3].value, userInputs[2].value);
  ADD_EVENT_WITH_VALUES.addNewEventButton();
});

// delete event button function
const deleteEventButton = () => {
  const deleteButtons = document.getElementsByClassName("delete"); // selecting delete buttons
  // selecting delete button which is clicked
  const deleteField = (e) => {
    const selectedDeleteField = e.target.parentNode.parentNode.parentNode.parentNode.parentNode; // selecting top container of the event field
    selectedDeleteField.remove(); // removes the selected event field
    let deleteFromMap = e.target.attributes[0].value; // selecting which event is deleted
    deleteFromMap = parseInt(deleteFromMap); // turning it to 'number'
    eventMap.delete(deleteFromMap); // deleting event from map
  };
  for (let button of deleteButtons) {
    button.addEventListener("click", deleteField); // activating to which delete button is pressed
  }
};
