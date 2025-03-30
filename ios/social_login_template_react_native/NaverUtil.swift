import UIKit

func getNaverURLScheme() -> String? {
    guard
        let urlTypes = Bundle.main.object(forInfoDictionaryKey: "CFBundleURLTypes") as? [[String: Any]],
        let firstMatch = urlTypes.first(where: { dict in
        // Identifier 기준으로 식별
        (dict["CFBundleTypeRole"] as? String)?.contains("Editor") ?? false
        }),
        let schemes = firstMatch["CFBundleURLSchemes"] as? [String],
        let scheme = schemes.first(where: { $0.contains("naver") })
    else {
        return nil
    }

    return scheme
}
