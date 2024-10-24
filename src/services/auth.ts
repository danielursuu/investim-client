import { AccountDetailsDTO } from "./AccountDetailsDTO";

export async function getUserData(): Promise<AccountDetailsDTO> {
  try {
    const response = await fetch("http://localhost:3001/api/account-details");
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = (await response.json())[0];
    console.log(data);

    return {
      ...data,
      // Provide fallback values for required display fields
      displayName: data.displayName || "User",
      accountTitle: data.accountTitle || "Account",
      accountStatus: data.accountStatus || 1,
      type: data.type || "N/A",
      tradingType: data.tradingType || "N/A",
      businessType: data.businessType || "N/A",
      parent: data.parent || {
        accountId: "N/A",
        isMParent: false,
        isMChild: false,
      },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}
