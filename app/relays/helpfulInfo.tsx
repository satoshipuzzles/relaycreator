"use client";
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import TextStringFreaks from '../components/textStringFreaks'

export default function HelpfulInfo(props: React.PropsWithChildren<{}>) {
    const { data: session, status } = useSession();
    const p = useSearchParams();
    if (p == null) {
        return (
            <>
                no p
            </>
        )
    }

    const relayname = p.get('relayname');
    let useName = ""
    if (relayname) {
        useName = relayname
    }

    const router = useRouter()

    const handleCreateRelay = async (event: any) => {
        event.preventDefault();

    }

    return (
        <div className="font-roboto">
            <div className="flex items-center text-center justify-center">
                <div className="text-2xl items-center mr-2">Find your</div>
                <TextStringFreaks />
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-base-100 p-4 rounded-lg text-center">
                    <div className="font-roboto">
                        <p>Join and start topical relays TREX™. Assemble your crew.</p>
                    </div>
                </div>
                <div className="bg-base-100 p-4 rounded-lg text-center">
                    <div className="font-roboto">
                        <p>Relay Container 2</p>
                    </div>
                </div>
                <div className="bg-base-100 p-4 rounded-lg text-center">
                    <div className="font-roboto">
                        <p>Relay Container 3</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
