import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { GrimoireCollectionEntry } from "../types/GrimoireCollection";

export default function CollectionTable(props: {
	cards: GrimoireCollectionEntry[];
}) {
	const flattenedEntries = useMemo(
		() =>
			props.cards.map((entry) => {
				return { quantity: entry.quantity, ...entry.card };
			}),
		[props.cards]
	);

	const tableColumns = useMemo(
		() => [
			{ Header: "ID", accessor: "id" },
			{ Header: "Card", accessor: "name" },
			{ Header: "Set", accessor: "setName" },
			{ Header: "Quantity", accessor: "quantity", defaultCanSort: true },
		],
		[]
	);
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable(
			{
				columns: tableColumns,
				data: flattenedEntries,
			},
			useSortBy
		);

	return (
		<table className="table table-striped table-hover" {...getTableProps()}>
			<thead>
				{headerGroups.map((headerGroup) => (
					// eslint-disable-next-line react/jsx-key
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							// eslint-disable-next-line react/jsx-key
							<th
								scope="column"
								{...column.getHeaderProps(column.getSortByToggleProps())}
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
		</table>
	);
}
