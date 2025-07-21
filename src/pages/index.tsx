import IntroCard from "@/components/IntroCard";
import TwitterCard from "@/components/TwitterCard";
import ToggleCard from "@/components/ToggleCard";
import MeowyCard from "@/components/MeowyCard";
import DiscordCard from "@/components/DiscordCard";
import MailCard from "@/components/MailCard";
import SpotifyCard from "@/components/SpotifyCard";
import GitHubCard from "@/components/GitHubCard";
import InstagramCard from "@/components/InstagramCard";
import CompanyCard from "@/components/CompanyCard";
import SoundCloudCard from "@/components/SoundCloudCard";
import YouTubeCard from "@/components/YouTubeCard";
import BlogCard from "@/components/BlogCard";
import TimelineCard from "@/components/TimelineCard";
import BookshelfCard from "@/components/BookshelfCard";
import { useState } from "react";
import OnlineCard from "@/components/OnlineCard";
import TimeCard from "@/components/TimeCard";

function Home() {
  const [section, setSection] = useState("all");
  return (
    <div className="flex flex-col m-5 font-nunito">
      <div
        className="grid grid-cols-3 gap-2 md:grid-cols-4 
			md:gap-4 mt-5 container mx-auto xl:px-20"
      >
        <IntroCard section={section} />
        <TwitterCard section={section} />
        <ToggleCard section={section} />
        <GitHubCard section={section} />
        <SpotifyCard section={section} />
        <InstagramCard section={section} />
        <SoundCloudCard section={section} />
        <YouTubeCard section={section} />
        <BlogCard section={section} />
        <CompanyCard section={section} />
        <MailCard section={section} />
        <TimeCard section={section} />
        <TimelineCard section={section} />
        <BookshelfCard section={section} />
      </div>
    </div>
  );
}

export default Home;
