import { SITE } from "~/config";
import postitIcon from "~/assets/images/postit-icon.jpeg"
import Image from "next/image";

const Logo = () => (
  <span className="ml-2 inline-flex items-center whitespace-nowrap text-2xl font-bold text-gray dark:text-white md:text-xl">
    POST{<Image width={30} height={30} alt={SITE.name} src={postitIcon}/>}IT
  </span>
);

export default Logo;
