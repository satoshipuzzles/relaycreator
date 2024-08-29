"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import TextStringFreaks from "../components/textStringFreaks";

export default function HelpfulInfo(props: React.PropsWithChildren<{}>) {
    const { status } = useSession();
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const p = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const fetchProfilePicture = async () => {
            if (window.nostr && status === "authenticated") {
                try {
                    const publicKey = await window.nostr.getPublicKey();
                    const relayUrl = "wss://relay.damus.io";

                    const profileQuery = {
                        kinds: [0], // Kind 0 for profile metadata
                        authors: [publicKey],
                        limit: 1,
                    };

                    const ws = new WebSocket(relayUrl);

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

                    ws.onerror = (error) => {
                        console.error("WebSocket error:", error);
                    };

                    ws.onclose = () => {
                        console.log("Disconnected from relay");
                    };
                } catch (error) {
                    console.error("Error fetching profile picture:", error);
                }
            }
        };

        fetchProfilePicture();
    }, [status]);

    const relayname = p?.get("relayname") || "";

    const handleCreateRelay = async (event: any) => {
        event.preventDefault();
        // Add your create relay logic here
    };

    return (
        <div className="font-roboto">
            <header className="flex items-center justify-between p-4 bg-base-100">
                <h1 className="text-xl">Your App Name</h1>
                <div>
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
            </header>
            <div className="flex items-center text-center justify-center mt-8">
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
        </div>
    );
}
