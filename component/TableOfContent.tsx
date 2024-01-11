export const TableOfContents = ({ toc }:{ toc:Array<any> }) => {
    return (
      <div>
        <p className="TableOfContentsHead">目次</p>
        <ul>
          {toc.map(data => (
            <li key={data.id}>
              <a href={`#${data.text}`}>
                {/* {data.title} */}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };