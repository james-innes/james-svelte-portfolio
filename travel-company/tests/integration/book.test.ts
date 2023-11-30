import type { Guest } from "../../src/lib/types";
import { expect, test } from "@playwright/test";
import newGuests from "../fixtures/newGuests";
import vnpayCard from "../fixtures/vnpayCard";

const tourOptionTestCase = [
  { index: 1, testCase: "Existing tour", expectedTourId: "tour:four" },
  { index: 2, testCase: "New tour", expectedTourId: "tour:five" },
];

test.describe("Create a Booking", () => {
  for (const tourOption of tourOptionTestCase) {
    test(tourOption.testCase, async ({ page }) => {
      await page.goto("/book");

      await page.selectOption("data-testid=tour-date-select", {
        index: tourOption.index,
      });

      const guestSelector = (index: number) => {
        const baseSelector = `[data-testid="guest-element-${index}"]`;
        return {
          name: `${baseSelector} [data-testid="name"]`,
          whatsapp: `${baseSelector} [data-testid="whatsapp"]`,
          email: `${baseSelector} [data-testid="email"]`,
          vegetarian: `${baseSelector} [data-testid="vegetarian"]`,
          drivingChoice: `${baseSelector} [data-testid="driving-choice"]`,
        };
      };

      async function fillInGuest(index: any, guest: Guest) {
        const selector = guestSelector(index);
        await page.fill(selector.name, guest.guestName);
        await page.fill(selector.whatsapp, guest.whatsApp);
        await page.fill(selector.email, guest.email);

        if (guest.isVegetarian) {
          await page.check(selector.vegetarian);
        }

        await page.selectOption(selector.drivingChoice, guest.drivingChoice);
      }

      await fillInGuest(0, newGuests.merritt);
      await page.click("data-testid=add-guest-button");
      await fillInGuest(1, newGuests.kian);

      await page.fill("data-testid=passcode", "123");

      const invoiceTotal = await page.textContent(
        "data-testid=invoice-total-amount"
      );

      const expectedInvoiceTotal = "12.700.000";
      expect(invoiceTotal).toContain(expectedInvoiceTotal);

      await page.click("data-testid=submit-button");

      await page.waitForURL(
        /.*vnpayment\.vn\/paymentv2\/Transaction\/PaymentMethod\.html.*/,
        {
          waitUntil: "domcontentloaded",
        }
      );

      async function waitForVnpayLoading() {
        await page.waitForSelector("body > div.loading > .lds-ring", {
          state: "hidden",
        });
      }

      await waitForVnpayLoading();
      await page.waitForSelector('[data-bs-target="#accordionList2"]');
      await page.click('[data-bs-target="#accordionList2"]');
      await page.click(`id=${vnpayCard.bankCode}`);

      await waitForVnpayLoading();
      await expect(page.locator("#totalAmountDt")).toHaveText(
        expectedInvoiceTotal
      );

      await page.fill("input#card_number_mask", vnpayCard.cardNumber);
      await page.fill("id=cardHolder", vnpayCard.cardHolder);
      await page.fill("id=cardDate", vnpayCard.cardDate);
      await page.click("id=btnContinue");

      await waitForVnpayLoading();
      await page.fill("id=otpvalue", vnpayCard.otp);
      await page.click("id=btnConfirm");

      // Wait for the booking confirmation page to load
      await page.waitForURL(/.*book\/confirm.*/);

      await expect(
        page.locator("data-testid=payment-confirmation-success-alert")
      ).toBeVisible();
    });
  }
});
