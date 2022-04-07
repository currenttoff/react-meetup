import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react/cjs/react.production.min";

/*
const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A first meetup",
    image:
      "https://th.bing.com/th/id/R.d5e500232ed7505425b726112fbc4a2d?rik=biEcMGBu4O9npA&riu=http%3a%2f%2finfo.examtime.com%2ffiles%2f2014%2f05%2f120_1r20120910_queens_15.jpg&ehk=sIpK2olWfHmxuL08s0%2bdX1F9hT0wDRvcm13JXx2PitY%3d&risl=&pid=ImgRaw&r=0",
    address: "Michigan University",
    description: "fun meetup",
  },
  {
    id: "m2",
    title: "A Second meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Bou_Inania_Madrasa%2CFes.jpg/1024px-Bou_Inania_Madrasa%2CFes.jpg",
    address: "Michigan University",
    description: "Playful meetup",
  },
];

*/

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetup App</title>
        <meta
          name="description"
          content="Browse a huge list of highly React Meetups "
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>
  );
}

/*
export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;

  //fetch data from API

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}
*/

export async function getStaticProps() {
  //fetch data from API
  const client = await MongoClient.connect(
    "mongodb+srv://toff07:toff07@cluster0.5aqia.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
    //updates after every 10s
  };
}

export default HomePage;
