import Link from 'next/link';

export const Pagination = ({ totalCount = 0 }: { totalCount?: number }) => {
    const PER_PAGE = 5;
    const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i);
    return (
        <ul>
            {range (1,Math.ceil(totalCount / PER_PAGE)).map((number,index)=> (
            <li key={index}>
            <Link href={`/blog/page/${number}`} >{number}</Link>
</li>
        ))}
            </ul>
            );
            };