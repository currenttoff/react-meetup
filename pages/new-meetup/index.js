// our-domain.com/new-meetup
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  //navigate away programatically
  const router = useRouter();

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

  return (
    <Fragment>
      <Head>
        <title>Add A New Meetup</title>
        <meta
          name="description"
          content="Add your own meetup  and network with people"
        ></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
