import Image from "next/image";

type UserIconProps = {
    name: string;
    image: string;
};

export default function UserIcon(props: UserIconProps) {
    return (
        <Image
            src={props.image}
            alt={props.name}
            width={100}
            height={100}
            className="h-8 w-8 rounded-full border border-gray-300 shadow-sm"
        />
    );
}
