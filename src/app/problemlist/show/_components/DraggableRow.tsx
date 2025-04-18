import { TableRow } from "@/components/ui/table";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

// ドラッグ可能な行のアイテムタイプ
const ItemTypes = {
	ROW: "row",
};

// ドラッグ可能な行コンポーネント
export default function DraggableRow({
	index,
	moveRow,
	children,
	id,
}: {
	index: number;
	moveRow: (dragIndex: number, hoverIndex: number) => void;
	children: React.ReactNode;
	// biome-ignore lint: reason
	id: any;
}) {
	const ref = useRef<HTMLTableRowElement>(null);

	const [{ handlerId }, drop] = useDrop({
		accept: ItemTypes.ROW,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		// biome-ignore lint: reason
		hover(item: any, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;

			// 自分自身の上にドロップしても何もしない
			if (dragIndex === hoverIndex) {
				return;
			}

			// マウスの位置を取得
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = (clientOffset?.y || 0) - hoverBoundingRect.top;

			// ドラッグしている要素が上から来た場合は、マウスが中央よりも上にあるときだけ移動する
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			// ドラッグしている要素が下から来た場合は、マウスが中央よりも下にあるときだけ移動する
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			// 実際に順序を入れ替える
			moveRow(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.ROW,
		item: () => {
			return { id, index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0.5 : 1;
	drag(drop(ref));

	return (
		<TableRow
			ref={ref}
			style={{ opacity }}
			data-handler-id={handlerId}
			className="hover:bg-gray-50 cursor-move"
		>
			{children}
		</TableRow>
	);
}
