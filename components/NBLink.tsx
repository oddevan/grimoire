import Link from "next/link";

export interface NBLinkProps {
	href: string;
	children: JSX.Element;
	className?: string;
}

export default function NBLink(props: NBLinkProps) {
	const { href, children, className } = props;
	return (
		<Link href={href}>
			<a className={className}>{children}</a>
		</Link>
	);
}
