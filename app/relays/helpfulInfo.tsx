"use client";

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import TextStringFreaks from '../components/textStringFreaks';

export default function HelpfulInfo(props: React.PropsWithChildren<{}>) {
    const { data: session, status } = useSession();
    const p = useSearchParams();
    const router = useRouter();

    if (p == null) {
        return <div>No parameters provided.</div>;
    }

    const relayname = p.get('relayname');
    let useName = "";
    if (relayname) {
        useName = relayname;
    }

    const handleCreateRelay = async (event: any) => {
        event.preventDefault();
        // Implement relay creation logic here
    };

    const profilePictureUrl = session?.user?.image || '/default-avatar.png'; // Replace with a default avatar URL if no profile picture is available

    return (
        <div className="font-roboto">
            <div className="flex items-center text-center justify-center">
                <div className="text-2xl items-center mr-2">Find your</div>
                <TextStringFreaks />
            </div>
            <div className="mt-8 flex flex-wrap gap-6 justify-center">
                {/* Updated styles for the relay containers */}
                <div className="bg-base-100 w-32 h-32 flex items-center justify-center text-center rounded-lg shadow-md">
                    <div className="font-roboto">
                        <p className="text-sm">Join and start topical relays TREX™. Assemble your crew.</p>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex justify-center">
                <a href={`/signup`} className="btn uppercase btn-primary mb-4">
                    Start a relay
                </a>
            </div>
            <div className="flex justify-center mt-4">
                <a className="btn btn-primary" href="/hivetalk">Hivetalk</a>
            </div>
            <div className="mt-4 flex justify-center items-center">
                <div className="flex items-center">
                    {/* Display profile picture */}
                    <Image 
                        src={profilePictureUrl}
                        alt="User Profile"
                        width={40}
                        height={40}
                        className="rounded-full border border-gray-300"
                    />
                </div>
            </div>
        </div>
    );
}
