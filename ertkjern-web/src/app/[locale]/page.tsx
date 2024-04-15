import { SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import { Profile } from "@/sanity/sanity.types";
import { urlFor } from "@/utils/sanity";
import { Header } from "@/components/layout/header";
import { About } from "@/components/layout/about";
import { CV } from "@/components/layout/cv";
import { Projects } from "@/components/layout/projects";
import { Footer } from "@/components/layout/footer";
import { LanguagePicker } from "@/components/molecules/lang-picker";

// Display Sanity content on the page
export default async function IndexPage({
  params: {locale}
}: {
  params: {locale: string};
}) {
  console.log("locale", locale);
  const profiles = (await client.fetch<SanityDocument[]>(
    `*[_type == "profile" && language == '${locale}']`
  )) as Profile[];
  // there can only be one. If none? Nothing to show
  if (profiles.length === 0) {
    return <div className="mx-auto flex items-center">No profile found</div>;
  }

  const myProfile = profiles[0];
  const profileImage = myProfile.profilePicture
    ? urlFor(myProfile.profilePicture)?.url()
    : null;

  return (
      <main>
        <LanguagePicker
          currentLanguage={locale}
        />
        <Header
          name={myProfile.name ?? ""}
          title={myProfile.title ?? ""}
          profileImage={profileImage}
        />
        <div id="about" className="my-32">
          <About
            body={myProfile.aboutMe ?? []}
          />
        </div>
        <div id="cv" className="px-4">
          <CV
            quickFacts={myProfile.quickFacts ?? []}
            introdution={myProfile.cvIntroduction ?? []}
            workAndEducation={myProfile.workAndEducation ?? []}
          />
        </div>
        <div id="projects" className="mt-32">
          <Projects
            projects={myProfile.projects ?? []}
            projectsDescription={myProfile?.projectsDescription ?? []}
          />
        </div>
        <Footer
          email={myProfile.email ?? ""}
          title={myProfile.footerTitle ?? ""}
        />
      </main>
  );
}
