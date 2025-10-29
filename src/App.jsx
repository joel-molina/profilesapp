import { useState, useEffect } from "react";
import {
  Button,
  Heading, 
  Flex, 
  View,
  Grid,
  Divider,
} from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";

/**
 * @type {import('aws-amplify/data').Client<Import('..amplify/data/resource').Schema>}
 */
Amplify.configure(outputs);

const client = generateClient({
  authMode: "userPool",
});

export default function App() {
  const [userprofiles, setUserProfiles] = useState([]);
  const { signOut } = useAuthenticator((context) => [context.user]);

    useEffect(() => {
      fetchUserProfile();
    }, []);

    //fetch userprofile data
    async function fetchUserProfile() {
      try {
        const { data: items} = await client.models.UserProfile.list();
        setUserProfiles(items);
      } catch (e) {
        console.error("Error fetching user profiles", e);
      }
    }

    return (
    <View padding="2rem">
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Heading level={1}>My Profile</Heading>
        <Button onClick={signOut}>Sign Out</Button>
      </Flex>
      
      <Divider padding="medium" />
      
      <Heading level={2}>My Profile Details:</Heading>
      <Grid
        templateColumns="1fr 1fr 1fr"
        gap="1rem"
      >
        {userprofiles.map((profile) => (
          <View
            key={profile.id}
            className="box" // Uses the .box class from index.css
            border="1px solid #ccc"
            borderRadius="8px"
            padding="1rem"
          >
            <Heading level={5}>Email: {profile.email}</Heading>
            <p>Owner ID: {profile.profileOwner}</p>
          </View>
        ))}
      </Grid>
    </View>
  );
}




/*
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {'999 Pho'}<span role="img" aria-label="thumbs up">👍</span> {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/