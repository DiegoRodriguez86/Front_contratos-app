import { Divider, Image } from '@nextui-org/react';


interface Props {
    children: React.ReactNode;
}

export const AuthLayout = ({ children }: Props) => {
    return (
        <div className="flex h-screen">
            <div className="flex-1 flex-col flex items-center justify-center p-6">
                {children}
            </div>
            <div className="hidden my-10 md:block">
                <Divider orientation="vertical" />
            </div>
            <div className="hidden md:flex flex-1 relative items-center justify-center p-6">
                <div className='absolute left-0 right-0 bottom-0 top-0 z-0'>
                    <Image
                        className='w-full max-h-screen'
                        src='https://nextui.org/gradients/docs-right.png'
                        alt='gradient'
                    />
                </div>
                <div className='z-10'>
                    <h1 className='font-bold text-[45px] font-sans'>CONTRATOS APP</h1>
                </div>
            </div>
        </div>
    );
};