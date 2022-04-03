import { useMemo } from "react";
import {
	useTable,
	useSortBy,
	HeaderGroup,
	UseSortByColumnProps,
} from "react-table";
import { GrimoireCollectionEntry } from "../types/GrimoireCollection";
import { Table as BSTable } from "react-bootstrap";

type SortableColumn = HeaderGroup<GrimoireCollectionEntry> &
	Partial<UseSortByColumnProps<GrimoireCollectionEntry>>;

export default function CollectionTable(props: {
	cards: GrimoireCollectionEntry[];
}) {
	const tableEntries = useMemo(() => props.cards, [props.cards]);

	const tableColumns = useMemo(
		() => [
			{ Header: "ID", accessor: (row: GrimoireCollectionEntry) => row.card.id },
			{
				Header: "Card",
				accessor: (row: GrimoireCollectionEntry) => row.card.name,
			},
			{
				Header: "Set",
				accessor: (row: GrimoireCollectionEntry) => row.card.setName,
			},
			{
				Header: "Quantity",
				accessor: (row: GrimoireCollectionEntry) => row.quantity,
			},
		],
		[]
	);
	const reactTableInstance = useTable(
		{
			columns: tableColumns,
			data: tableEntries,
		},
		useSortBy
	);
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		reactTableInstance;

	return (
		<BSTable striped hover {...getTableProps()}>
			<thead>
				{headerGroups.map((headerGroup) => (
					// eslint-disable-next-line react/jsx-key
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column: SortableColumn) => (
							// eslint-disable-next-line react/jsx-key
							<th
								scope="column"
								{...column.getHeaderProps(
									column.getSortByToggleProps
										? column.getSortByToggleProps()
										: undefined
								)}
							>
								{column.render("Header")}
								<span>
									{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
								</span>
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					let firstCol = true;
					return (
						// eslint-disable-next-line react/jsx-key
						<tr {...row.getRowProps()}>
							{row.cells.map((cell) => {
								if (firstCol) {
									firstCol = false;
									return (
										<th scope="row" {...cell.getCellProps()}>
											{cell.render("Cell")}
										</th>
									);
								}

								return (
									// eslint-disable-next-line react/jsx-key
									<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</BSTable>
	);
}
