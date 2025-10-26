import ImageSection from "../components/ImageSection";
import Search from "../components/Search";
import Settings from "../components/Settings";

export default function CreateImages() {
  return (
    <div className="relative z-10">
      <h2 className="text-4xl font-bold mb-8">
        Let's create a masterpiece, Dear! <span className="text-2xl"></span>
      </h2>

      <Settings></Settings>

      <ImageSection></ImageSection>
    </div>
  );
}
