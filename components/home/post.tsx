import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  FaThumbsUp,
  FaRegCommentDots,
  FaShare,
  FaPaperPlane,
} from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import { IKImage } from "imagekitio-next";

interface PostCardProps {
  authorName?: string;
  authorAvatar?: string;
  postDate?: string;
  contentText?: string;
  mediaUrl?: string;
  mediaAlt?: string;
  likes?: number;
  comments?: number;
}

export default function Post({
  authorName,
  authorAvatar,
  postDate,
  contentText,
  mediaUrl,
  mediaAlt,
  likes=21,
  comments=32,
}: PostCardProps) {
  const { user }: any = useUser();
  const userProfileImage = user?.profile_image;
  const cover_image = user?.cover_image;
  const headline = user?.headline;
  const fullName = `${user?.first_name} ${user?.last_name}`;

  return (
    <div className="w-full max-w-[35rem] mx-auto py-4 bg-white rounded-lg border-2">
      <div className="px-4 gap-4 flex flex-col">
        <div className="flex items-center space-x-3 ">
        <IKImage
          src={userProfileImage}
          alt="Profile Picture"
          className="rounded-full object-cover"
          width={50}
          height={50}
        />
        <div className="">
          <p className="font-semibold text-sm leading-tight">{fullName}</p>
          <p className="text-xs text-gray-500 leading-tight">{headline}</p>
          <p className="text-xs text-gray-500 leading-tight">jhhjgjh</p>
        </div>
        </div>
        <div>
        <p className="text-sm whitespace-pre-line">hdkjhadkjhasdkjhasdkha aksjdhkajshd ahsdkjashdkjsah ashdkjasdhzxmnczx,mcndlksdjaslkd alkdjaskljd klajda sdlkjasdlkjaskldj lkjdlkasjdklsadj  alskdjaslkdjal skjdlaskdjlksadjlaskjd alks jdlkasjd ladjlaks das dlkasjdklasd a lsdkjalfjalkfjx cxz,mcz,cslkdfjlkdsjf alksdjlkasjdoqiuoiqwru dalfksa lkc</p>
        </div>
      </div>

      <div className="mt-4 space-y-4">

        {cover_image && (
          <AspectRatio
            ratio={16 / 9}
            className="w-full overflow-hidden"
          >
            <IKImage
              src={"https://ik.imagekit.io/ConnectIn/pexels-pixabay-147411_XcQIIKj7cU.jpg?updatedAt=1743941978568"}
              alt="Post image"
              width={1280}
              height={720}
              className="object-contain w-full h-full"
            />
          </AspectRatio>
        )}


        <div className="flex justify-between text-sm text-gray-600 mt-2 px-4">
          <div className="flex items-center space-x-2">
            <FaThumbsUp className="text-[var(--mainGreen)]" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaRegCommentDots className="text-[var(--mainGreen)]" />
            <span>{comments}</span>
          </div>
        </div>

        <div className="flex justify-around text-gray-700 pt-3 border-t mt-3">
          <button className="flex items-center gap-1 hover:text-[var(--mainGreenDark)]">
            <FaThumbsUp /> Like
          </button>
          <button className="flex items-center gap-1 hover:text-[var(--mainGreenDark)]">
            <FaRegCommentDots /> Comment
          </button>
          <button className="flex items-center gap-1 hover:text-[var(--mainGreenDark)]">
            <FaShare /> Repost
          </button>
          <button className="flex items-center gap-1 hover:text-[var(--mainGreenDark)]">
            <FaPaperPlane /> Send
          </button>
        </div>

    </div>
    </div>
  );
}
