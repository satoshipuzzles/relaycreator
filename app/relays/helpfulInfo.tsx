"use client"
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import TextStringFreaks from '../components/textStringFreaks';
import { useEffect, useState } from 'react';

export default function HelpfulInfo(props: React.PropsWithChildren<{}>) {
    const { data: session, status } = useSession();
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const p = useSearchParams();

    useEffect(() => {
        const fetchProfilePicture = async () => {
            if (window.nostr && status === "authenticated") {
                const publicKey = await window.nostr.getPublicKey();
                const relays = ["wss://relay.damus.io", "wss://relay.snort.social"];
                const profileQuery = {
                    kinds: [0],  // Kind 0 is typically the kind used for user profiles
                    authors: [publicKey],
                    limit: 1
                };

                // Fetch the profile from the relay
                const ws = new WebSocket(relays[0]);
                ws.onopen = () => {
                    ws.send(JSON.stringify(["REQ", "profileReq", profileQuery]));
                };
                ws.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data[0] === "EVENT" && data[2]?.kind === 0) {
                        const profile = JSON.parse(data[2].content);
                        setProfilePicture(profile.picture || `https://robohash.org/${publicKey}.png`);
                    }
                };
            }
        };

        fetchProfilePicture();
    }, [status]);

    if (p == null) {
        return <p>No relay name found.</p>;
    }

    const relayname = p.get('relayname');
    let useName = relayname ? relayname : "";

    const router = useRouter();

    const handleCreateRelay = async (event: any) => {
        event.preventDefault();
        // Add your create relay logic here
    };

    return (
        <div className="font-roboto">
            <div className="flex items-center text-center justify-center">
                <div className="text-2xl items-center mr-2">Find your</div>
                <TextStringFreaks />
            </div>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <div className="bg-base-100 w-60 h-60 flex items-center justify-center text-center rounded-lg shadow-md">
                    <div>
                        <p>Join and start topical relays TREX™. Assemble your crew.</p>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex justify-center">
                <a href={`/signup`} className="btn uppercase btn-primary mb-4">
                    Start a relay
                </a>
            </div>
            <div className="flex justify-center">
                <a className="btn btn-primary" href="/hivetalk">hivetalk</a>
            </div>
            {status === "authenticated" && (
                <div className="absolute top-4 right-4">
                    {profilePicture ? (
                        <Image
                            src={profilePicture}
                            alt="User Profile Picture"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            )}
        </div>
    );
}
