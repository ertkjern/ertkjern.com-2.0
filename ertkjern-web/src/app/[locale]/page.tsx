import { getHomeProfile } from "@/sanity/queries";
import { urlFor } from "@/utils/sanity";
import { Header } from "@/components/layout/header";
import { About } from "@/components/layout/about";
import { CV } from "@/components/layout/cv";
import { Projects } from "@/components/layout/projects";
import { Footer } from "@/components/layout/footer";
import { LanguagePicker } from "@/components/molecules/lang-picker";
import { Metadata } from "next";

type MetaDataProps = {
  params: Promise<{ locale: 'en' | 'no' }>;
}

 
type Params = Promise<{ locale: 'en' | 'no' }>


export async function generateMetadata(
  { params }: MetaDataProps,
): Promise<Metadata> {
  const { locale } = await params;
  const profile = await getHomeProfile(locale);

  return {
    title: profile?.metaTitle ?? "",
    description: profile?.metaDescription ?? "",
  }
}


export default async function IndexPage({
  params
}: {
  params: Params
}) {
  const { locale } = await params;
  const profile = await getHomeProfile(locale);

  if (!profile) {
    return <div className="mx-auto flex items-center">No profile found</div>;
  }

  const profileImage = profile.profilePicture
    ? urlFor(profile.profilePicture)?.url()
    : null;

  return (
    <>
      <main>
        <LanguagePicker currentLanguage={locale} href="/" />
        <Header
          name={profile.name ?? ""}
          title={profile.title ?? ""}
          profileImage={profileImage}
        />
        <div id="about" className="my-32">
          <About body={profile.aboutMe ?? []} />
        </div>
        <div id="cv" className="px-4">
          <CV
            locale={locale}
            quickFacts={profile.quickFacts ?? []}
            introdution={profile.cvIntroduction ?? []}
            workAndEducation={profile.workAndEducation ?? []}
          />
        </div>
        <div id="projects" className="mt-32">
          <Projects
            locale={locale}
            projects={profile.projects ?? []}
            projectsDescription={profile.projectsDescription ?? []}
          />
        </div>
        <Footer
          email={profile.email ?? ""}
          title={profile.footerTitle ?? ""}
        />
      </main>
    </>
  );
}
