import { SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import { Profile } from "@/sanity/sanity.types";
import { urlFor } from "@/utils/sanity";
import { Header } from "@/components/layout/header";
import { About } from "@/components/layout/about";

const EVENTS_QUERY = `*[_type == "profile"]`;

// Display Sanity content on the page
export default async function IndexPage() {
  const profiles = (await client.fetch<SanityDocument[]>(
    EVENTS_QUERY
  )) as Profile[];

  // there can only be one. If none? Nothing to show
  if (profiles.length === 0) {
    return <div>No profile found</div>;
  }

  const myProfile = profiles[0];
  const profileImage = myProfile.profilePicture
    ? urlFor(myProfile.profilePicture)?.url()
    : null;

    console.log(myProfile);

  return (
    <main>
      <Header
        name={myProfile.name ?? ''}
        title={myProfile.title ?? ''}
        profileImage={profileImage}
      />
      <div id="about" className="h-screen">
        <About title="About" body={myProfile.aboutMe ?? []} />
      </div>
      <div id="cv">This is the target section.</div>
      <div id="projects">This is the target section.</div>
    </main>
  );
}
