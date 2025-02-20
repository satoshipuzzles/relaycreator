"use client"
import { RelayWithEverything } from "../components/relayWithEverything"
import { useState, useEffect } from "react"
import Relay from "../components/relay"

export default function PublicRelays() {
    const [results, setResults] = useState<RelayWithEverything[]>([])
    const [allRelays, setAllRelays] = useState<RelayWithEverything[]>([])

    useEffect(() => {
        const fetchRelays = async () => {
            try {
                const response = await fetch(`/api/relay/guiRelays`)
                const data = await response.json()
                setResults(data.publicRelays)
                setAllRelays(data.publicRelays)
            } catch (error) {
                console.error('Error fetching relays:', error)
            }
        }
        fetchRelays()
    }, [])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const targetToLower = e.target.value.toLowerCase()
        const r = allRelays.filter((relay) => {
            if (relay.name.toLowerCase().includes(targetToLower)) {
                return true
            }

            if (relay.details && relay.details.toLowerCase().includes(targetToLower)) {
                return true
            }
            return false
        })
        setResults(r)
    }

    //maybe try flex grow

    return (
        <div className="">
            <div className="">
                <div className="">
                    <div className="mt-4 flex">
                        <input className="flex-grow input input-bordered text-center mr-2 ml-2" placeholder="Search" onChange={(e) => handleSearch(e)} />
                    </div>
                </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-12">
                {results.map((relay) => (
                    <Relay key={"pub" + relay.id} modActions={false} relay={relay} showEdit={false} showSettings={false} showDetail={true} showExplorer={false} showCopy={false} />
                ))}
            </div>
        </div>
    )
}