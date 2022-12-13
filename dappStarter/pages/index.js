import Login from "../components/Login";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { votingTokenAddress, editionDropAddress, voteAddress } from "../scripts/constants.js";
import { AddressZero } from "@ethersproject/constants";
import Proposal from "../components/Proposal";

export default function Home() {
  const address = useAddress();
  const editionDrop = useContract(editionDropAddress, "edition-drop").contract;
  const token = useContract(votingTokenAddress, "token").contract;
  const vote = useContract(voteAddress, "vote").contract;


  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  const [proposals, setProposals] = useState([]);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    if (!address) {
      return;
    }

    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 0);
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
        } else {
          setHasClaimedNFT(false);
        }
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Failed to get nft balance", error);
      }
    };
    checkBalance();
  }, [address, editionDrop]);

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    const getAllProposals = async () => {
      try {
        const proposals = await vote.getAll();
        setProposals(proposals);
      } catch (error) {
        console.error("failed to get proposals", error);
      }
    };
    getAllProposals();
  }, [hasClaimedNFT, vote]);

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    if (!proposals.length) {
      return;
    }

    const checkIfUserHasVoted = async () => {
      try {
        const hasVoted = await vote.hasVoted(proposals[0].proposalId, address);
        setHasVoted(hasVoted);
      } catch (error) {
        console.error("Failed to check if wallet has voted", error);
      }
    };
    checkIfUserHasVoted();
  }, [hasClaimedNFT, proposals, address, vote]);

  const mintNft = async () => {
    setIsClaiming(true);
    try {
      await editionDrop.claim("0", 1);
      setHasClaimedNFT(true);
      console.log("🌊 Successfully Minted the NFT!");
    } catch (error) {
      console.error("failed to claim", error);
    } finally {
      setIsClaiming(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVoting(true);

    const votes = proposals.map((proposal) => {
      const voteResult = {
        proposalId: proposal.proposalId,
        vote: 2,
      };
      proposal.votes.forEach((vote) => {
        const elem = document.getElementById(
          proposal.proposalId + "-" + vote.type
        );

        if (elem.checked) {
          voteResult.vote = vote.type;
          return;
        }
      });
      return voteResult;
    });

    try {
      const delegation = await token.getDelegationOf(address);
      if (delegation === AddressZero) {
        await token.delegateTo(address);
      }
      try {
        await Promise.all(
          votes.map(async ({ proposalId, vote: _vote }) => {
            const proposal = await vote.get(proposalId);
            if (proposal.state === 1) {
              return vote.vote(proposalId, _vote);
            }
            return;
          })
        );
        try {
          await Promise.all(
            votes.map(async ({ proposalId }) => {
              const proposal = await vote.get(proposalId);

              if (proposal.state === 4) {
                return vote.execute(proposalId);
              }
            })
          );
          setHasVoted(true);
        } catch (err) {
          console.error("failed to execute votes", err);
        }
      } catch (err) {
        console.error("failed to vote", err);
      }
    } catch (err) {
      console.error("failed to delegate tokens", err);
    } finally {
      setIsVoting(false);
    }
  };

  console.log(address);

  if (!address) {
    return <Login />;
  }

  if (hasClaimedNFT) {
    return (
      <div className={styles.container}>
        <h2>Active Proposals</h2>
        <form onSubmit={handleFormSubmit}>
          {proposals.map((proposal) => (
            <Proposal
              key={proposal.proposalId}
              votes={proposal.votes}
              description={proposal.description}
              proposalId={proposal.proposalId}
            />
          ))}

          <button
            onClick={handleFormSubmit}
            type="submit"
            disabled={isVoting || hasVoted}
            className={styles.button}
          >
            {isVoting
              ? "Voting..."
              : hasVoted
              ? "You Already Voted"
              : "Submit Votes"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Mint your free voting NFT!</h1>
      <button
        className={styles.button}
        disabled={isClaiming}
        onClick={() => mintNft()}
      >
        {isClaiming ? "Minting..." : "Mint your NFT"}
      </button>
    </div>
  );
}
