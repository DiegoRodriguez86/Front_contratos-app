import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import React from 'react';

interface Props {
    title: string;
    children: React.ReactNode;
    buttonAdd: React.ReactNode;
}

export const LayoutCatalogos = ({ title, children, buttonAdd }: Props) => {

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Card className="w-auto">
                <CardHeader className='lg:flex lg:items-center lg:justify-between'>
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
                            {title}
                        </h2>
                    </div>
                    <div className="mt-5 flex lg:ml-4 lg:mt-0">
                        <span className="hidden sm:block">
                            {buttonAdd}
                        </span>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    {children}
                </CardBody>
            </Card>
        </div>
    );
};
