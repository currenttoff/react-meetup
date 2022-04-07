// our-domain.com/new-meetup
import router from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    router.push("/");
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}

export default NewMeetupPage;

// "mongodb+srv://toff07:123456789@cluster0.p17do.mongodb.net/meetups?retryWrites=true&w=majority"

//"mongodb+srv://toff07:CsQM33TR6QbabMJi@cluster0.p17do.mongodb.net/meetups?retryWrites=true&w=majority"
