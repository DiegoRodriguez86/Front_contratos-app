
interface Props {
    children: React.ReactNode;
}

export const LayoutCatalogos = ({ children }: Props) => {
    return (
        <div className="h-screen">
            {children}
        </div>
    );
};
