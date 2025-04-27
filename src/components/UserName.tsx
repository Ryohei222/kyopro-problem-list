type UserNameProps = {
	id: string;
	name: string;
};

export function UserName({ id, name }: UserNameProps) {
	return (
		<a
			href={`/user/${id}`}
			className="text-blue-600 hover:underline block"
			onClick={(e) => e.stopPropagation()}
		>
			{name}
		</a>
	);
}
