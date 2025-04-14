import UserIcon from "./UserIcon";
import { UserName } from "./UserName";
type CardUserInfoProps = {
	id: string;
	name: string;
	image: string;
};

export function CardUserInfo({ id, name, image }: CardUserInfoProps) {
	return (
		<span className="flex items-center gap-2">
			<UserIcon name={name} image={image} />
			<UserName id={id} name={name} />
		</span>
	);
}
