type Props = {
    children: React.ReactNode;
};

const LeccionLayout = ({ children }: Props) => {
    return (
        <div className="flex felx-col h-full">
            <div className="flex flex-col h-full w-full">
                {children}
            </div>
        </div>
    );
};

export default LeccionLayout;