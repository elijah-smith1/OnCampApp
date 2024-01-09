//
//  Home .swift
//  letsgetrich
//
//  Created by Michael Washington on 9/9/23.
//

import SwiftUI

struct Feed: View {
    @StateObject var viewmodel = feedViewModel()
    @State private var selectedFeed = "Following"
    let feedOptions = ["Following", "Favorites", "For You"]

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 0) {
                    ForEach(viewmodel.Posts, id: \.id) { post in
                        PostCell(post: post)
                    }
                }
            }
          
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Menu(selectedFeed) {
                        ForEach(feedOptions, id: \.self) { option in
                            Button(action: {
                                selectedFeed = option
                                switch selectedFeed {
                                case "Following":
                                    EmptyView()
                                    //viewmodel.loadFollowingPosts()
                                case "Favorites":
                                    EmptyView()
                                    //viewmodel.loadFavoritesPosts()
                                case "For You":
                                    EmptyView()
                                   // viewmodel.loadForYouPosts()
                                default:
                                    break
                                }
                            }) {
                                Label(option, systemImage: "circle")
                            }
                        }
                    }
                }
            }
        }
    }
}


struct Feed__Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack{
            Feed()
         
        }
    }
}
